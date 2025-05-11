<section class="px-4 py-16 bg-[#eeeeee]">
    <div class="container w-[90%] m-auto">
        <div class="mb-12">
            <h2 class="text-xl font-['BioRhyme_Expanded'] text-blue-900 uppercase text-left">Contact us</h2>
        </div>

        <div class="flex flex-col-reverse lg:flex-row gap-8">
            <div class="w-full lg:w-8/12">
                <h3 class="text-xl font-bold text-left text-gray-900 uppercase mb-4">
                    fill out the form, and we'll contact you.
                </h3>

                <div class="lg:w-7/12">
                    <form id="contactForm" action="https://formspree.io/f/xwplbdpq" method="POST" class="space-y-4">
                        <div class="mb-6">
                            <h4 class="font-medium text-gray-900 mb-2">I AM INTERESTED IN:</h4>
                            <div class="flex flex-wrap gap-2 mb-4">
                                <label class="relative">
                                    <input type="checkbox" name="interest[]" value="BRANDING" class="absolute opacity-0 w-full h-full cursor-pointer peer">
                                    <span class="inline-block border-2 border-black px-4 py-1 text-sm peer-checked:bg-black peer-checked:text-white">BRANDING</span>
                                </label>
                                <label class="relative">
                                    <input type="checkbox" name="interest[]" value="WEBSITE DESIGN" class="absolute opacity-0 w-full h-full cursor-pointer peer">
                                    <span class="inline-block border-2 border-black px-4 py-1 text-sm peer-checked:bg-black peer-checked:text-white">WEBSITE DESIGN</span>
                                </label>
                                <label class="relative">
                                    <input type="checkbox" name="interest[]" value="CONTENT CREATION" class="absolute opacity-0 w-full h-full cursor-pointer peer">
                                    <span class="inline-block border-2 border-black px-4 py-1 text-sm peer-checked:bg-black peer-checked:text-white">CONTENT CREATION</span>
                                </label>
                                <label class="relative">
                                    <input type="checkbox" name="interest[]" value="PACKAGING" class="absolute opacity-0 w-full h-full cursor-pointer peer">
                                    <span class="inline-block border-2 border-black px-4 py-1 text-sm peer-checked:bg-black peer-checked:text-white">PACKAGING</span>
                                </label>
                                <label class="relative">
                                    <input type="checkbox" name="interest[]" value="OTHER" class="absolute opacity-0 w-full h-full cursor-pointer peer">
                                    <span class="inline-block border-2 border-black px-4 py-1 text-sm peer-checked:bg-black peer-checked:text-white">OTHER</span>
                                </label>
                            </div>
                        </div>

                        <div>
                            <input name="name" placeholder="Full Name" type="text" class="w-full p-2 border-b-2 border-gray-400 bg-transparent" required>
                        </div>

                        <div>
                            <input name="email" placeholder="Email" type="email" class="w-full p-2 border-b-2 border-gray-400 bg-transparent" required>
                        </div>

                        <div>
                            <input name="phone" placeholder="Phone Number" type="tel" class="w-full p-2 border-b-2 border-gray-400 bg-transparent">
                        </div>

                        <div>
                            <input name="company" placeholder="Company Name" type="text" class="w-full p-2 border-b-2 border-gray-400 bg-transparent">
                        </div>

                        <div>
                            <textarea name="message" placeholder="Tell us about your business" class="w-full p-2 border-b-2 border-gray-400 bg-transparent h-24" required></textarea>
                        </div>

                        <p id="form-status" class="text-green-500 text-sm hidden"></p>

                        <button type="submit" class="bg-gray-900 text-white px-8 py-3 uppercase font-medium hover:bg-gray-700 transition-colors">
                            SUBMIT
                        </button>
                    </form>
                </div>
            </div>

            <div class="lg:w-4/12">
                <div class="mb-6">
                    <img src="{{ asset('LM/JPG/haytham.jpg') }}" alt="Haytham" class="w-full h-auto">
                </div>
                <p class="italic text-justify text-xl text-[#666666] mb-4">
                    Did you know that 4 out of 5 customers switch brands due to poor customer experience and design? <br>
                    At Landmark, we specialize in crafting innovative and trendy visuals that not only captivate but also make your products and projects unforgettable.
                </p>
                <h4 class="font-bold text-xl uppercase">HAYTHAM GUERMAH</h4>
                <p class="font-medium italic text-xs">FOUNDER & CEO OF @LANDMARK</p>
            </div>
        </div>
    </div>
</section>