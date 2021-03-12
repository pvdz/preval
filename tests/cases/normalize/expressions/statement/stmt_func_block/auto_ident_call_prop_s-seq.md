# Preval test case

# auto_ident_call_prop_s-seq.md

> Normalize > Expressions > Statement > Stmt func block > Auto ident call prop s-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let b = { $ };

    let a = { a: 999, b: 1000 };
    (1, 2, b).$(1);
    $(a);
  }
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  {
    let b = { $ };
    let a = { a: 999, b: 1000 };
    (1, 2, b).$(1);
    $(a);
  }
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  let b = { $: $ };
  let a = { a: 999, b: 1000 };
  const tmpCallObj = b;
  tmpCallObj.$(1);
  $(a);
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function () {
  const b = { $: $ };
  const a = { a: 999, b: 1000 };
  b.$(1);
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
 - 2: { a: '999', b: '1000' }
 - 3: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
