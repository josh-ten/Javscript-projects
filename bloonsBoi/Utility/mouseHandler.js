var itemOnMouse;
var selectedTower;

function mousePressed() {
	//Add Tower
	if (mousePos.x < width - 300) {
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
		}
		for (var i = 0; i < towers.length; i++) {
			if (mousePos.copy().sub(towers[i].pos).mag() < towers[i].size) {
				towers[i].selected = true;
				selectedTower = towers[i];
				break;
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
			for (var i = 0; i < gui.items.length; i++) {
				if (mousePos.copy().sub(gui.items[i].pos).mag() < gui.items[i].size) {
					gui.items[i].clicked();
					itemOnMouse = gui.items[i];
				}
			}
		}
	}
}
