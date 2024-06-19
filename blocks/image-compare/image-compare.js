
export default function decorate(block) {

	const right = block.querySelector('div:nth-child(1)');
	right.className = 'image-compare-right';

	const left = block.querySelector('div:nth-child(2)');
	left.className = 'image-compare-left';

	const slider = document.createElement('div');
	slider.className = 'image-compare-slider';

	const sliderButton = document.createElement('input');
	sliderButton.type = 'range';
	slider.appendChild(sliderButton);
	left.parentNode.insertBefore(slider, left.nextSibling);

	const resizeLeft = () => {
		left.value = 50;
		return e => left.style.width = `${e.target.value}%`;
	};

	sliderButton.addEventListener('input', resizeLeft());
}

