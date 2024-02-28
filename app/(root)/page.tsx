import { fetchThreads } from '@/lib/actions/thread.actions';

export default async function Home() {
    const result = await fetchThreads(1, 30);

    return (
        <>
            <h1 className='head-text text-left'>Home</h1>
            <section className='mt-9 flex flex-col gap-10'>
                {result.allPosts.length === 0 ? (
                    <p className='no-result'>No threads found</p>
                ) : (
                    <></>
                )}
            </section>
        </>
    );
}
