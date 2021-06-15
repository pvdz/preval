# Preval test case

# auto_ident_call_computed_s-seq_simple.md

> Normalize > Expressions > Bindings > Stmt func block > Auto ident call computed s-seq simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let b = { $ };

    let a = (1, 2, b)["$"](1);
    $(a);
  }
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  {
    let b = { $: $ };
    let a = (1, 2, b)[`$`](1);
    $(a);
  }
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  let b = { $: $ };
  const tmpCallObj = b;
  let a = tmpCallObj.$(1);
  $(a);
  return undefined;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const b = { $: $ };
const a = b.$(1);
$(a);
$(undefined);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
