# Preval test case

# ident_ident_bin.md

> Normalize > Binding > Stmt-global-block > Ident ident bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
if ($(true)) {
  let b = 2, c = 3, d = 4;
  let a = b = c + d;
  $(a, b, c);
}
`````

## Pre Normal

`````js filename=intro
if ($(true)) {
  let b = 2,
    c = 3,
    d = 4;
  let a = (b = c + d);
  $(a, b, c);
}
`````

## Normalized

`````js filename=intro
const tmpIfTest = $(true);
if (tmpIfTest) {
  let b = 2;
  let c = 3;
  let d = 4;
  b = c + d;
  let a = b;
  $(a, b, c);
} else {
}
`````

## Output

`````js filename=intro
const tmpIfTest = $(true);
if (tmpIfTest) {
  $(7, 7, 3);
} else {
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( true );
if (a) {
  $( 7, 7, 3 );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - 2: 7, 7, 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
