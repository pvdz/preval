# Preval test case

# auto_ident_computed_c-seq_simple.md

> Normalize > Expressions > Bindings > Stmt func block > Auto ident computed c-seq simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let b = { c: 1 };

    let a = (1, 2, $(b))[$("c")];
    $(a, b);
  }
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  {
    let b = { c: 1 };
    let a = (1, 2, $(b))[$(`c`)];
    $(a, b);
  }
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  let b = { c: 1 };
  const tmpCompObj = $(b);
  const tmpCompProp = $(`c`);
  let a = tmpCompObj[tmpCompProp];
  $(a, b);
  return undefined;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const b = { c: 1 };
const tmpCompObj = $(b);
const tmpCompProp = $(`c`);
const a = tmpCompObj[tmpCompProp];
$(a, b);
$(undefined);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { c: '1' }
 - 2: 'c'
 - 3: 1, { c: '1' }
 - 4: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
