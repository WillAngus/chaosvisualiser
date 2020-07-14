// Entity Mangager : new EntityManager(maximum entities)
class EntityManager {
	constructor(max) {
		this.maximum = max;
		this.entities = [];
		this.points = [];
		this.showId = false;
	}
	run() {
		for (let i = this.entities.length-1; i >= 0; i--) {
            let e = this.entities[i];
            
			!e.kill || (this.entities.splice(i, 1), this.filterPoints()); 

			this.showId ? e.showId = true : e.showId = false;

			e.run();
		}
	}
	spawnPoint(id, x, y, size, health, fill, eq_num) {
		// Check maximum number of entities and spawn if within limit
		if (this.entities.length < this.maximum) {
			// Add new points to array of entities
			this.entities.push(new Point(id, x, y, size, health, fill, eq_num));
			// Update array of points
			this.filterPoints();
		} else {
			// Log warning if entity limit reached or exceeded
			console.warn('Could not create point. Maximum number of entities reached: ' + this.maximum);
		}
	}
	filterPoints() {
		// Find points within the main entity array and index them
		this.points = this.entities.filter(function(element) {
			return element.entityType = 'point';
		});
	}
	getEntityById(id) {
		// Return entity with specified id
		return this.entities.find(x => x.id === id);
	}
}