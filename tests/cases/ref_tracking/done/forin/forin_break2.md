# Preval test case

# forin_break2.md

> Ref tracking > Done > Forin > Forin break2
>
> bloop

#TODO

## Input

`````js filename=intro
const wat = { a: 1, b: 2 };
for (const x in wat) {
  $(x);
  break;
}
$();
`````

## Pre Normal


`````js filename=intro
const wat = { a: 1, b: 2 };
for (const x in wat) {
  $(x);
  break;
}
$();
`````

## Normalized


`````js filename=intro
const wat = { a: 1, b: 2 };
const tmpForInDeclRhs = wat;
let x = undefined;
for (x in tmpForInDeclRhs) {
  $(x);
  break;
}
$();
`````

## Output


`````js filename=intro
let x = undefined;
const wat = { a: 1, b: 2 };
for (x in wat) {
  $(x);
  break;
}
$();
`````

## PST Output

With rename=true

`````js filename=intro
let a = undefined;
const b = {
  a: 1,
  b: 2,
};
for (a in b) {
  $( a );
  break;
}
$();
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'a'
 - 2: 
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
