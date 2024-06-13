# Preval test case

# forin.md

> Ref tracking > Done > Forin > Forin
>
> Any statements that follow a return in the same parent should be eliminated.

This loop could be dropped because all branches return/break it.

#TODO

## Input

`````js filename=intro
for (let x in {a:10, b:20}) {
  $('fail');
}
$('keep, do not eval');
`````

## Pre Normal


`````js filename=intro
for (let x in { a: 10, b: 20 }) {
  $(`fail`);
}
$(`keep, do not eval`);
`````

## Normalized


`````js filename=intro
const tmpForInDeclRhs = { a: 10, b: 20 };
let x = undefined;
for (x in tmpForInDeclRhs) {
  $(`fail`);
}
$(`keep, do not eval`);
`````

## Output


`````js filename=intro
let x = undefined;
const tmpForInDeclRhs = { a: 10, b: 20 };
for (x in tmpForInDeclRhs) {
  $(`fail`);
}
$(`keep, do not eval`);
`````

## PST Output

With rename=true

`````js filename=intro
let a = undefined;
const b = {
  a: 10,
  b: 20,
};
for (a in b) {
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
