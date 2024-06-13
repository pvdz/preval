# Preval test case

# auto_ident_object_complex.md

> Normalize > Expressions > Statement > For a > Auto ident object complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for ({ x: $(1), y: 2, z: $(3) }; $(0); );
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
{
  ({ x: $(1), y: 2, z: $(3) });
  while ($(0)) {}
}
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
$(1);
$(3);
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
$(1);
$(3);
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
$( 1 );
$( 3 );
const a = $( 0 );
if (a) {
  let b = $( 0 );
  while ($LOOP_UNROLL_10) {
    if (b) {
      b = $( 0 );
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
$( c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 3
 - 3: 0
 - 4: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
