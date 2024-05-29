# Preval test case

# forof.md

> Ref tracking > Done > Forof > Forof
>
> Any statements that follow a return in the same parent should be eliminated.

This loop could be dropped because all branches return/break it.

#TODO

## Input

`````js filename=intro
for (let x of [10, 20]) {
  $('fail');
}
$('keep, do not eval');
`````

## Pre Normal

`````js filename=intro
for (let x of [10, 20]) {
  $(`fail`);
}
$(`keep, do not eval`);
`````

## Normalized

`````js filename=intro
const tmpForOfDeclRhs = [10, 20];
let x = undefined;
for (x of tmpForOfDeclRhs) {
  $(`fail`);
}
$(`keep, do not eval`);
`````

## Output

`````js filename=intro
let x = undefined;
const tmpForOfDeclRhs = [10, 20];
for (x of tmpForOfDeclRhs) {
  $(`fail`);
}
$(`keep, do not eval`);
`````

## PST Output

With rename=true

`````js filename=intro
let a = undefined;
const b = [ 10, 20 ];
for (a of b) {
  $( "fail" );
}
$( "keep, do not eval" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'fail'
 - 2: 'fail'
 - 3: 'keep, do not eval'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
