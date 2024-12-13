import { Autocomplete, Button, Card, CardContent, Stack, TextField } from '@mui/material'
import { CustomBreadcrumbs, enqueueSnackbar, FormProvider, Iconify, RHFAutocomplete, Upload } from '@verisure-core'
import React, { useCallback, useState } from 'react'
import { RouterLinks } from '../../../app-route-paths'
import { LoadingButton } from '@mui/lab'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { newKycRequestDefaultValues, newKycRequestValidationSchema } from './form-helper'
import { useMutation } from '@tanstack/react-query'
import { AWSService, ICreateKycRequest, IFileUploadAwsRequestPayload, IKYCRequestCreationResponse, IPreSignedUrlRequest, IPreSignedUrlResponse, KYCService } from '@verisure-services'
import { InferType } from 'yup'
import { AxiosError, AxiosResponse } from 'axios'
import { useNavigate } from 'react-router-dom'

type fileType = {
  name: string,
};

const RequestNewKycPage = () => {
  const navigate = useNavigate();

  const [file, setFile] = useState<File | null >(null);

  type newKycRequestValidationSchemaType = InferType<typeof newKycRequestValidationSchema>;

  const methods = useForm<newKycRequestValidationSchemaType>({
    defaultValues: newKycRequestDefaultValues,
    resolver: yupResolver(newKycRequestValidationSchema),
  });

  const handleDropSingleFile = useCallback((acceptedFiles: File[]) => {
    const newFile = acceptedFiles[0];
    
    if (newFile) {
      setFile(
        Object.assign(newFile, {
          preview: URL.createObjectURL(newFile),
        })
      );
    }
  }, []);

  const fileUploadAwsAPICall = useMutation({
    mutationFn: (payload: IFileUploadAwsRequestPayload) => AWSService().fileUploadAws(payload),

    onSuccess: () => {
      enqueueSnackbar('File Uploaded Successfully', { variant: 'success' });
    },

    onError: (error: AxiosError<{ message: string }>) => {
      enqueueSnackbar(error?.response?.data?.message, { variant: "error" });
    }
  });

  const fileUploadAwsNameGetterApi = useMutation({
    mutationFn: (payload: IPreSignedUrlRequest) => AWSService().fileUploadAwsNameGetter(payload),

    onSuccess: (response: AxiosResponse<IPreSignedUrlResponse[]>) => {

      const payload: IFileUploadAwsRequestPayload = {
        url: response.data[0].url,
        payload: file,
      };

      fileUploadAwsAPICall.mutateAsync(payload).then(() => {
        methods.setValue('documentName', response.data[0].fileName);
        methods.trigger();
      });
    },

    onError: (error: AxiosError<{ message: string }>) => {
      enqueueSnackbar(error?.response?.data?.message, { variant: "error" });
    }
  });  

  const handleUpload = async () => {
    if (!file) {
      enqueueSnackbar('Please select a file to upload.', { variant: 'error' });
      return;
    }
  
    try {
      const payload: IPreSignedUrlRequest = {
        fileNames: [file?.name],
      };
  
      fileUploadAwsNameGetterApi.mutateAsync(payload);
    } catch (error) {
      enqueueSnackbar('An error occurred during file upload. Please try again.', { variant: 'error' });
    }
  };

  const createKycApiCall = useMutation({
    mutationFn: (payload: ICreateKycRequest) => KYCService().createKyc(payload),
    
    onSuccess: (response: AxiosResponse<IKYCRequestCreationResponse>) => {
      enqueueSnackbar(response.data.message, { variant: 'success' });
      navigate(RouterLinks.myKyc);
      
    },

    onError: (error: AxiosError<any>) => {
      if (error.status === 400) {
        enqueueSnackbar(error.response?.data?.message, { variant: 'error' });
      }
    }
  });

  const onSubmit = (formValues: newKycRequestValidationSchemaType) => {
    console.log(formValues);

    const payload: ICreateKycRequest = {
      documentType: formValues.documentType === 'Passport' ? 'passport' : 'driving_license',
      images: [formValues.documentName],
    }

    createKycApiCall.mutateAsync(payload);
  }
  

  return (
    <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>

      <Stack spacing={2} marginTop={2} marginBottom={20}>
        <CustomBreadcrumbs
          sx={{ width: 1 }}
          heading="Request KYC"
          links={[
            {
              name: 'My Kyc',
              icon: <Iconify icon="arcticons:secure-box" />,
              href: RouterLinks.myKyc,
            },
            {
              name: 'Request KYC',
            },
          ]}

          action={
            <LoadingButton
              variant='contained'
              type='submit'
              startIcon={<Iconify icon="carbon:intent-request-upgrade" />}
              disabled={!methods.formState.isValid}
            >
              Request KYC
            </LoadingButton>
          }
        />

        <Card>
          <CardContent>
            <Stack spacing={3}>
              <RHFAutocomplete
                options={['Driving License', 'Passport'] as const}
                name='documentType'
                label='Document Type'
                disableClearable
              />

              <Upload
                file={file}
                onDrop={handleDropSingleFile}
                onDelete={() => {
                  methods.setValue('documentName', '');
                  setFile(null);
                }}
              />
            </Stack>

            <Stack flexDirection='row' justifyContent='end'>
              <LoadingButton
                loading={fileUploadAwsNameGetterApi.isPending || fileUploadAwsAPICall.isPending}
                disabled={fileUploadAwsNameGetterApi.isPending || fileUploadAwsAPICall.isPending || methods.formState.isValid}
                startIcon={<Iconify icon="ep:upload-filled" />}
                color='primary'
                variant='contained'
                onClick={handleUpload}
              >
                Upload
              </LoadingButton>
            </Stack>

          </CardContent>
        </Card>
      </Stack>
    </FormProvider>
  )
}

export default RequestNewKycPage