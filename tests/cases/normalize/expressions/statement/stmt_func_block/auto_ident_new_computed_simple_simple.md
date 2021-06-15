# Preval test case

# auto_ident_new_computed_simple_simple.md

> Normalize > Expressions > Statement > Stmt func block > Auto ident new computed simple simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let b = { $ };

    let a = { a: 999, b: 1000 };
    new b["$"](1);
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
    let a = { a: 999, b: 1000 };
    new b[`$`](1);
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
  let a = { a: 999, b: 1000 };
  const tmpNewCallee = b.$;
  new tmpNewCallee(1);
  $(a);
  return undefined;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
new $(1);
const a = { a: 999, b: 1000 };
$(a);
$(undefined);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: { a: '999', b: '1000' }
 - 3: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
