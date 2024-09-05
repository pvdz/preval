# Preval test case

# auto_ident_prop_s-seq_assign_simple.md

> Normalize > Expressions > Statement > For a > Auto ident prop s-seq assign simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
for ((1, 2, b).c = 2; $(0); );
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
{
  (1, 2, b).c = 2;
  while ($(0)) {}
}
$(a, b);
`````

## Normalized


`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpAssignMemLhsObj = b;
tmpAssignMemLhsObj.c = 2;
while (true) {
  const tmpIfTest = $(0);
  if (tmpIfTest) {
  } else {
    break;
  }
}
$(a, b);
`````

## Output


`````js filename=intro
const tmpIfTest = $(0);
if (tmpIfTest) {
  while ($LOOP_UNROLL_10) {
    const tmpIfTest$1 = $(0);
    if (tmpIfTest$1) {
    } else {
      break;
    }
  }
} else {
}
const a = { a: 999, b: 1000 };
const b = { c: 2 };
$(a, b);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 0 );
if (a) {
  while ($LOOP_UNROLL_10) {
    const b = $( 0 );
    if (b) {

    }
    else {
      break;
    }
  }
}
const c = {
  a: 999,
  b: 1000,
};
const d = { c: 2 };
$( c, d );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: { a: '999', b: '1000' }, { c: '2' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
