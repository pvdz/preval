# Preval test case

# auto_ident_call_complex.md

> Normalize > Expressions > Statement > For a > Auto ident call complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for ($($)(1); $(0); );
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
{
  $($)(1);
  while ($(0)) {}
}
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallComplexCallee = $($);
tmpCallComplexCallee(1);
let tmpIfTest = $(0);
while (true) {
  if (tmpIfTest) {
    tmpIfTest = $(0);
  } else {
    break;
  }
}
$(a);
`````

## Output


`````js filename=intro
const tmpCallComplexCallee = $($);
tmpCallComplexCallee(1);
const tmpIfTest = $(0);
if (tmpIfTest) {
  let tmpClusterSSA_tmpIfTest = $(0);
  while ($LOOP_UNROLL_10) {
    if (tmpClusterSSA_tmpIfTest) {
      tmpClusterSSA_tmpIfTest = $(0);
    } else {
      break;
    }
  }
} else {
}
const a = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( $ );
a( 1 );
const b = $( 0 );
if (b) {
  let c = $( 0 );
  while ($LOOP_UNROLL_10) {
    if (c) {
      c = $( 0 );
    }
    else {
      break;
    }
  }
}
const d = {
a: 999,
b: 1000
;
$( d );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - 3: 0
 - 4: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
