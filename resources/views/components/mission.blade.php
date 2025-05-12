<div {{ $attributes->merge(['class' => 'container mx-auto py-16 px-4 sm:px-10 w-[90%] m-auto']) }}>
    <h2 class="text-xl tracking-[0.2em] font-['BioRhyme_Expanded'] mb-6 uppercase pl-0">Notre Mission</h2>
    <div class="relative w-full aspect-video  overflow-hidden">
        <img
            src="../LM/JPG/video.png"
            alt="Notre Mission"
            class="w-full h-full object-cover" />
        <!-- Play Button Overlay -->
        <div class="absolute inset-0 flex items-center justify-center">
            <button class="w-16 h-16 rounded-full flex items-center justify-center hover:bg-black/40 transition-all">
                <img src="LM/Services/videoIcon2.svg" alt="" class="w-12 h-12 rounded-full flex items-center justify-center">
            </button>
        </div>
    </div>
</div>