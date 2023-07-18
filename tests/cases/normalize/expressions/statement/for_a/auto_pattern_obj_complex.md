# Preval test case

# auto_pattern_obj_complex.md

> Normalize > Expressions > Statement > For a > Auto pattern obj complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

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
const tmpCalleeParam = { a: 1, b: 2 };
$(tmpCalleeParam);
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
$(999);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
a: 1,
b: 2
;
$( a );
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
