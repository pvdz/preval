# Preval test case

# auto_ident_prop_s-seq_assign_simple.md

> normalize > expressions > statement > param_default > auto_ident_prop_s-seq_assign_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
function f(arg = ((1, 2, b).c = 2)) {}
$(f());
$(a, b);
`````

## Normalized

`````js filename=intro
function f($tdz$__arg) {
  let arg = undefined;
  const tmpIfTest = $tdz$__arg === undefined;
  if (tmpIfTest) {
    1;
    2;
    const tmpNestedAssignObj = b;
    const tmpNestedPropAssignRhs = 2;
    tmpNestedAssignObj.c = tmpNestedPropAssignRhs;
    arg = tmpNestedPropAssignRhs;
  } else {
    arg = $tdz$__arg;
  }
}
let b = { c: 1 };
let a = { a: 999, b: 1000 };
('<hoisted func decl `f`>');
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Output

`````js filename=intro
function f($tdz$__arg) {
  let arg = undefined;
  const tmpIfTest = $tdz$__arg === undefined;
  if (tmpIfTest) {
    const tmpNestedAssignObj = b;
    tmpNestedAssignObj.c = 2;
    arg = 2;
  } else {
    arg = $tdz$__arg;
  }
}
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Result

Should call `$` with:
 - 1: undefined
 - 2: { a: '999', b: '1000' }, { c: '2' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
