class Track {
    constructor(track) {
        this.trackPoints = [];
        if (track == "sampleMap") this.initDefaultMap();
    }

    addTrackPoint(x, y) {
        var newPoint = createVector(x, y);
        this.trackPoints.push(newPoint);
    }

    initDefaultMap() {
        this.addTrackPoint(-100, 286);
        this.addTrackPoint(460, 286);
        this.addTrackPoint(460, 122);
        this.addTrackPoint(800, 122);
        this.addTrackPoint(800, 442);
        this.addTrackPoint(1500, 442);
    }
}