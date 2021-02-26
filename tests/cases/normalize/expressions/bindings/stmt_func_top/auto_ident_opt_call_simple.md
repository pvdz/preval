# Preval test case

# auto_ident_opt_call_simple.md

> Normalize > Expressions > Bindings > Stmt func top > Auto ident opt call simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  let a = $?.(1);
  $(a);
}
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  let a = undefined;
  const tmpChainRootCall = $;
  const tmpIfTest = tmpChainRootCall != null;
  if (tmpIfTest) {
    const tmpChainElementCall = tmpChainRootCall(1);
    a = tmpChainElementCall;
  }
  $(a);
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function () {
  let a = undefined;
  const tmpIfTest = $ != null;
  if (tmpIfTest) {
    const tmpChainElementCall = $(1);
    a = tmpChainElementCall;
  }
  $(a);
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
