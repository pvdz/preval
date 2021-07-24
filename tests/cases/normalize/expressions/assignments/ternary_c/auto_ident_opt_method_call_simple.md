# Preval test case

# auto_ident_opt_method_call_simple.md

> Normalize > Expressions > Assignments > Ternary c > Auto ident opt method call simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: $ };

let a = { a: 999, b: 1000 };
$($(0) ? $(100) : (a = b?.c(1)));
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { c: $ };
let a = { a: 999, b: 1000 };
$($(0) ? $(100) : (a = b?.c(1)));
$(a);
`````

## Normalized

`````js filename=intro
let b = { c: $ };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParam = undefined;
const tmpIfTest = $(0);
if (tmpIfTest) {
  tmpCalleeParam = $(100);
} else {
  let tmpNestedComplexRhs = undefined;
  const tmpChainRootProp = b;
  const tmpIfTest$1 = tmpChainRootProp != null;
  if (tmpIfTest$1) {
    const tmpChainElementObject = tmpChainRootProp.c;
    const tmpChainElementCall = $dotCall(tmpChainElementObject, tmpChainRootProp, 1);
    tmpNestedComplexRhs = tmpChainElementCall;
  } else {
  }
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpIfTest = $(0);
if (tmpIfTest) {
  const tmpClusterSSA_tmpCalleeParam = $(100);
  $(tmpClusterSSA_tmpCalleeParam);
} else {
  const b = { c: $ };
  const tmpChainElementCall = $dotCall($, b, 1);
  a = tmpChainElementCall;
  $(tmpChainElementCall);
}
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: 1
 - 3: 1
 - 4: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
