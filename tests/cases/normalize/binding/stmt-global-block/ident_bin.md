# Preval test case

# ident_bin.md

> Normalize > Binding > Stmt-global-block > Ident bin
>
> Assignments of all kinds should be normalized in all circumstances

## Input

`````js filename=intro
if ($(true)) {
  let b = 2, c = 3;
  let a = b + c;
  $(a, b, c);
}
`````

## Pre Normal


`````js filename=intro
if ($(true)) {
  let b = 2,
    c = 3;
  let a = b + c;
  $(a, b, c);
}
`````

## Normalized


`````js filename=intro
const tmpIfTest = $(true);
if (tmpIfTest) {
  let b = 2;
  let c = 3;
  let a = b + c;
  $(a, b, c);
} else {
}
`````

## Output


`````js filename=intro
const tmpIfTest = $(true);
if (tmpIfTest) {
  $(5, 2, 3);
} else {
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( true );
if (a) {
  $( 5, 2, 3 );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - 2: 5, 2, 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
