# Preval test case

# auto_ident_computed_s-seq_simple.md

> Normalize > Expressions > Bindings > Stmt func block > Auto ident computed s-seq simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let b = { c: 1 };

    let a = (1, 2, b)[$("c")];
    $(a, b);
  }
}
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  let b = { c: 1 };
  const tmpCompObj = b;
  const tmpCompProp = $('c');
  let a = tmpCompObj[tmpCompProp];
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
  const tmpCompProp = $('c');
  const a = b[tmpCompProp];
  $(a, b);
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'c'
 - 2: 1, { c: '1' }
 - 3: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
