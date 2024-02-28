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
import { Button } from '../ui/button';
import * as z from 'zod';
import { Input } from '../ui/input';
import { usePathname, useRouter } from 'next/navigation';
import { CommentValidation } from '@/lib/validations/thread';
import Image from 'next/image';

interface Props {
    threadId: string;
    currentUserImage: string;
    currentUserId: string;
}

export default function Comment({
    threadId,
    currentUserImage,
    currentUserId,
}: Props) {
    const router = useRouter();
    const pathname = usePathname();

    const form = useForm({
        resolver: zodResolver(CommentValidation),
        defaultValues: {
            thread: '',
        },
    });

    const onSubmit = async (values: z.infer<typeof CommentValidation>) => {
        /* await createThread({
            text: values.thread,
            author: userId,
            communityId: null,
            path: pathname,
        }); */

        router.push('/');
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='comment-form'
            >
                <FormField
                    control={form.control}
                    name='thread'
                    render={({ field }) => (
                        <FormItem className='flex items-center gap-3 w-full'>
                            <FormLabel className='text-base-semibold text-light-2'>
                                <Image
                                    src={currentUserImage}
                                    alt='profile image'
                                    width={48}
                                    height={48}
                                    className='rounded-full object-cover'
                                />
                            </FormLabel>
                            <FormControl className='border-none bg-transparent'>
                                <Input
                                    type='text'
                                    placeholder='Comment...'
                                    className='no-focus text-light-1 outline-none'
                                    {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <Button type='submit' className='bg-primary-500'>
                    Submit
                </Button>
            </form>
        </Form>
    );
}
