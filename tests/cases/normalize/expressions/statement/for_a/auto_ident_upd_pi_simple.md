# Preval test case

# auto_ident_upd_pi_simple.md

> Normalize > Expressions > Statement > For a > Auto ident upd pi simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
for (++b; $(0); );
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
{
  ++b;
  while ($(0)) {}
}
$(a, b);
`````

## Normalized

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
b = b + 1;
let tmpIfTest = $(0);
while (true) {
  if (tmpIfTest) {
    tmpIfTest = $(0);
  } else {
    break;
  }
}
$(a, b);
`````

## Output

`````js filename=intro
let tmpIfTest = $(0);
if (tmpIfTest) {
  tmpIfTest = $(0);
  while ($LOOP_UNROLL_10) {
    if (tmpIfTest) {
      tmpIfTest = $(0);
    } else {
      break;
    }
  }
} else {
}
const a = { a: 999, b: 1000 };
$(a, 2);
`````

## PST Output

With rename=true

`````js filename=intro
let a = $( 0 );
if (a) {
  a = $( 0 );
  while ($LOOP_UNROLL_10) {
    if (a) {
      a = $( 0 );
    }
    else {
      break;
    }
  }
}
const b = {
a: 999,
b: 1000
;
$( b, 2 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: { a: '999', b: '1000' }, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
