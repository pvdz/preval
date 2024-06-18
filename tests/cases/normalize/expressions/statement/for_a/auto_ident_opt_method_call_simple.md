# Preval test case

# auto_ident_opt_method_call_simple.md

> Normalize > Expressions > Statement > For a > Auto ident opt method call simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { c: $ };

let a = { a: 999, b: 1000 };
for (b?.c(1); $(0); );
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { c: $ };
let a = { a: 999, b: 1000 };
{
  b?.c(1);
  while ($(0)) {}
}
$(a);
`````

## Normalized


`````js filename=intro
let b = { c: $ };
let a = { a: 999, b: 1000 };
const tmpChainRootProp = b;
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainRootProp.c;
  const tmpChainElementCall = $dotCall(tmpChainElementObject, tmpChainRootProp, 1);
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
const b = { c: $ };
const a = { a: 999, b: 1000 };
$dotCall($, b, 1);
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
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { c: $ };
const b = {
  a: 999,
  b: 1000,
};
$dotCall( $, a, 1 );
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
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 0
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
