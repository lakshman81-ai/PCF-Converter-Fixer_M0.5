# Future Enhancements & Major Fixes

Based on the execution of the PCF Smart Fixer Accuracy Benchmark Suite (`BM1` through `BM6`), several complex topological anomalies require major architectural additions to the `SmartFixer` engine. These capabilities fall outside the scope of minor heuristics and demand dedicated logic modules.

## 1. Complex Synthesis: Injecting Synthetic Reducers (BM3)
Currently, when the topological graph encounters a sudden, un-bridged change in bore size (e.g., from `200mm` main line to `100mm` branch pipe), it flags an error but does not mutate the geometry.
**Required Enhancement:**
- The `PcfTopologyGraph2` or `GapOverlap` engine needs a dedicated "Bore Discrepancy" pass.
- When an immutable component (like a TEE) with a specific branch bore connects directly to a pipe of a different bore, the engine must automatically generate and inject a `REDUCER` component object.
- The `REDUCER` must correctly align its `ep1` and `ep2` based on the vector between the TEE and the PIPE, and accurately apply the `bore` to `ep1` and the `reducedBore` to `ep2`.

## 2. Complex Synthesis: Missing Component Assemblies (BM6)
The engine currently struggles to heal massive geometric gaps (e.g., >300mm) effectively when they occur on perpendicular axes or in complex branch assemblies. BM6 highlights a scenario where entire assemblies (like Relief Valves - RVs) are missing from the input PCF.
**Required Enhancement:**
- A new heuristics layer (potentially `AssemblySynthesis.js`) is needed to analyze large, multi-axis voids in the pipeline.
- Instead of just blindly injecting a `PIPE` to bridge a gap, the engine must recognize specific topological "signatures" (e.g., a void between two flanges, or a perpendicular branch drop).
- Based on these signatures, it should synthesize missing immutable components. For BM6, this means detecting the perpendicular gaps and injecting `SYNTH-VALVE-1` and `SYNTH-VALVE-2` into the `dataTable` to restore continuous flow without relying on linear pipe stretches.

## 3. Advanced Vector Priority for Multi-Axis Snapping
While BM2 dominant axis snapping was partially implemented, edge cases involving simultaneous rotations or non-orthogonal gaps require a more robust matrix-based snapping algorithm.
**Required Enhancement:**
- Upgrade `VectorMath.js` to handle strict orthogonal constraints (snapping to nearest 90/45 degree axis) when translating rigid blocks, to prevent the pipeline from skewing diagonally when healing gaps.
