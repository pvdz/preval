# Preval test case

# auto_ident_opt_call_complex_simple.md

> Normalize > Expressions > Statement > For a > Auto ident opt call complex simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for ($($)?.(1); $(0); );
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
{
  $($)?.(1);
  while ($(0)) {}
}
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpChainRootCall = $;
const tmpChainElementCall = tmpChainRootCall($);
const tmpIfTest = tmpChainElementCall != null;
if (tmpIfTest) {
  const tmpChainElementCall$1 = $dotCall(tmpChainElementCall, tmpChainRootCall, 1);
} else {
}
let tmpIfTest$1 = $(0);
while (true) {
  if (tmpIfTest$1) {
    tmpIfTest$1 = $(0);
  } else {
    break;
  }
}
$(a);
`````

## Output


`````js filename=intro
const tmpChainElementCall = $($);
const tmpIfTest = tmpChainElementCall == null;
if (tmpIfTest) {
} else {
  $dotCall(tmpChainElementCall, $, 1);
}
const tmpIfTest$1 = $(0);
if (tmpIfTest$1) {
  let tmpClusterSSA_tmpIfTest$1 = $(0);
  while ($LOOP_UNROLL_10) {
    if (tmpClusterSSA_tmpIfTest$1) {
      tmpClusterSSA_tmpIfTest$1 = $(0);
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
const b = a == null;
if (b) {

}
else {
  $dotCall( a, $, 1 );
}
const c = $( 0 );
if (c) {
  let d = $( 0 );
  while ($LOOP_UNROLL_10) {
    if (d) {
      d = $( 0 );
    }
    else {
      break;
    }
  }
}
const e = {
a: 999,
b: 1000
;
$( e );
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
