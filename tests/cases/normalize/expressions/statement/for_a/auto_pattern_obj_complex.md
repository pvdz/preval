# Preval test case

# auto_pattern_obj_complex.md

> Normalize > Expressions > Statement > For a > Auto pattern obj complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let { a } = { a: 999, b: 1000 };
for ($({ a: 1, b: 2 }); $(0); );
$(a);
`````

## Pre Normal


`````js filename=intro
let { a: a } = { a: 999, b: 1000 };
{
  $({ a: 1, b: 2 });
  while ($(0)) {}
}
$(a);
`````

## Normalized


`````js filename=intro
let bindingPatternObjRoot = { a: 999, b: 1000 };
let a = bindingPatternObjRoot.a;
const tmpCallCallee = $;
const tmpCalleeParam = { a: 1, b: 2 };
tmpCallCallee(tmpCalleeParam);
while (true) {
  const tmpIfTest = $(0);
  if (tmpIfTest) {
  } else {
    break;
  }
}
$(a);
`````

## Output


`````js filename=intro
const tmpCalleeParam /*:object*/ = { a: 1, b: 2 };
$(tmpCalleeParam);
const tmpIfTest /*:unknown*/ = $(0);
if (tmpIfTest) {
  while ($LOOP_UNROLL_10) {
    const tmpIfTest$1 /*:unknown*/ = $(0);
    if (tmpIfTest$1) {
    } else {
      break;
    }
  }
} else {
}
$(999);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
  a: 1,
  b: 2,
};
$( a );
const b = $( 0 );
if (b) {
  while ($LOOP_UNROLL_10) {
    const c = $( 0 );
    if (c) {

    }
    else {
      break;
    }
  }
}
$( 999 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { a: '1', b: '2' }
 - 2: 0
 - 3: 999
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
