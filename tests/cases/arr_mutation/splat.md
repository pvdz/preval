# Preval test case

# splat.md

> Arr mutation > Splat
>
> Testing the inlining of array mutations

## Input

`````js filename=intro
const arr = [1, 2, 3];
for (const a in arr) {
  const b = a;
  $(b);
}
`````

## Pre Normal

`````js filename=intro
const arr = [1, 2, 3];
for (const a in arr) {
  const b = a;
  $(b);
}
`````

## Normalized

`````js filename=intro
const arr = [1, 2, 3];
const tmpForInDeclRhs = arr;
let a = undefined;
for (a in tmpForInDeclRhs) {
  const b = a;
  $(b);
}
`````

## Output

`````js filename=intro
let a = undefined;
const arr = [1, 2, 3];
for (a in arr) {
  $(a);
}
`````

## PST Output

With rename=true

`````js filename=intro
let a = undefined;
const b = [ 1, 2, 3 ];
for (a in b) {
  $( a );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '0'
 - 2: '1'
 - 3: '2'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
