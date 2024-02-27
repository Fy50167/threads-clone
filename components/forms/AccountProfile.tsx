'use client';

import { useForm } from 'react-hook-form';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '../ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserValidation } from '@/lib/validations/user';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import * as z from 'zod';
import Image from 'next/image';
import { ChangeEvent } from 'react';

interface Props {
    user: {
        id: string;
        objectId: string;
        username: string;
        name: string;
        bio: string;
        image: string;
    };
    btnTitle: string;
}

export default function AccountProfile({ user, btnTitle }: Props) {
    const form = useForm({
        resolver: zodResolver(UserValidation),
        defaultValues: {
            profile_photo: '',
            name: '',
            username: '',
            bio: '',
        },
    });

    const handleImage = (
        e: ChangeEvent,
        fieldChange: (value: string) => void
    ) => {
        e.preventDefault();
    };

    function onSubmit(values: z.infer<typeof UserValidation>) {
        console.log(values);
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='flex flex-col justify-start gap-10'
            >
                <FormField
                    control={form.control}
                    name='profile_photo'
                    render={({ field }) => (
                        <FormItem className='flex items-center gap-4'>
                            <FormLabel className='account-form__image-label'>
                                {field.value ? (
                                    <Image
                                        src={field.value}
                                        alt='profile photo'
                                        width={96}
                                        height={96}
                                        priority
                                        className='rounded-full object-contain'
                                    />
                                ) : (
                                    <Image
                                        src='/assets/profile.svg'
                                        alt='profile photo'
                                        width={24}
                                        height={24}
                                        className='object-contain'
                                    />
                                )}
                            </FormLabel>
                            <FormControl className='flex-1 test-base-semibold text-gray-200'>
                                <Input
                                    type='file'
                                    accept='image/#'
                                    placeholder='Upload a a photo'
                                    className='account-form__image-input'
                                    onChange={(e) =>
                                        handleImage(e, field.onChange)
                                    }
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='name'
                    render={({ field }) => (
                        <FormItem className='flex items-center gap-3 w-full'>
                            <FormLabel className='text-base-semibold text-light-2'>
                                Name
                            </FormLabel>
                            <FormControl className='flex-1 test-base-semibold text-gray-200'>
                                <Input
                                    className='account-form_input no-focus'
                                    type='text'
                                    {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Button type='submit'>Submit</Button>
            </form>
        </Form>
    );
}
