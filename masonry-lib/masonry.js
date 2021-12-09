const MasonryAtciveClassName = 'masonryActive';

class Masonry{
	constructor(element, option ={}){
		this.containerNode = element;
		this.childrenNodes = element.children;
		this.childrenData = Array.from(this.childrenNodes).map((childNode)=>(
		{
			childNode,
			origHeight:Number(childNode.dataset.height),
			origWidth:Number(childNode.dataset.width)
		}));
		this.setting={
			gap: option.gap || 0,
			columns: option.columns || 3 
		};

		this.setParametrs(); 	
	}

	setParametrs(){ 
		const containerWidth = this.containerNode.offsetWidth;

		const widthImage = (containerWidth - this.setting.gap * (this.setting.columns - 1)) / this.setting.columns;

		this.childrenData = this.childrenData.map((child)=>({
			...child,
			currentWidth: widthImage,
			currentHeight: Math.floor(widthImage * child.origHeight / child.origWidth)
		
		}));

		const heightColumns = new Array(this.setting.columns).fill(0);
		const sizeColumns = new Array(this.setting.columns).fill(0);

		this.childrenData.forEach((child, i)=>{
			
			heightColumns[i % this.setting.columns] += child.currentHeight + this.setting.gap;

			sizeColumns[i % this.setting.columns] += 1;
		});

		const minHeightColymn = heightColumns.reduce((acc, size)=>(size < acc) ? size : acc);
		const diffImages = heightColumns.map((heightColumn, i)=>
			(heightColumn - minHeightColymn) / sizeColumns[i]);

		this.containerNode.style.width=`${containerWidth}px`;
		this.containerNode.style.height=`${minHeightColymn - this.setting.gap}px`;

		const topSets = new Array(this.setting.columns).fill(0);

		this.childrenData = this.childrenData.map((child, i)=>{
			const indexColumns = i % this.setting.columns;
			const left = indexColumns * widthImage + this.setting.gap * 
			indexColumns;

			const currentheight = child.currentHeight - diffImages[indexColumns];
			const top = topSets[indexColumns];
			topSets[indexColumns] += currentheight + this.setting.gap;


			return{
				...child,
				currentheight,
				left,
				top
			};
		});
		console.log(this.containerNode.style)
		
		this.childrenData.forEach((child)=>{
			child.childNode.style.top = `${child.top}px`;
			child.childNode.style.left = `${child.left}px`;
			child.childNode.style.width = `${child.currentWidth}px`;
			child.childNode.style.height = `${child.currentheight}px`;
			console.log(child.currentheight)

		});	
				 
		
		//this.containerNode.className+=MasonryAtciveClassName;
		//console.log(this.containerNode.style.heigth)
	}

} 
