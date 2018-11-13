var itemOnMouse;
var selectedTower;

function mousePressed() {
	if (mousePos.x < width - 300) {
		//Add Tower
		if (selectedTower) selectedTower.selected = false;
		if (itemOnMouse) {
			var newTower;
			if (itemOnMouse.id == "basic")
				newTower = new BasicTower(mouseX, mouseY);
			else if (itemOnMouse.id == "fast")
				newTower = new FastTower(mouseX, mouseY);

			selectedTower = newTower;
			newTower.selected = true;
			towers.push(newTower);
		} else {
			//Click on existing tower
			for (var i = 0; i < towers.length; i++) {
				if (withinRange(mousePos, towers[i].pos, towers[i].size)) {
					towers[i].selected = true;
					selectedTower = towers[i];
					break;
				}
			}
		}
	}

	//Click on gui side
	if (mousePos.x > width - 300) {
		if (itemOnMouse != null) {
			itemOnMouse.replaced();
			itemOnMouse = null;
		}
		else {
			//Click on tower item
			gui.items.forEach(item => {
				if (withinRange(mousePos, item.pos, item.size)) {
					item.clicked();
					itemOnMouse = item;
				}
			});
		}
	}
}
