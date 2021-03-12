# Preval test case

# auto_ident_prop_s-seq.md

> Normalize > Expressions > Bindings > Stmt func block > Auto ident prop s-seq
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let b = { c: 1 };

    let a = (1, 2, b).c;
    $(a, b);
  }
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  {
    let b = { c: 1 };
    let a = (1, 2, b).c;
    $(a, b);
  }
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  let b = { c: 1 };
  const tmpCompObj = b;
  let a = tmpCompObj.c;
  $(a, b);
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function () {
  const b = { c: 1 };
  const a = b.c;
  $(a, b);
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1, { c: '1' }
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
