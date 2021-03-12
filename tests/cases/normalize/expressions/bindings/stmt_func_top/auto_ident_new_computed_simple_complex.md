# Preval test case

# auto_ident_new_computed_simple_complex.md

> Normalize > Expressions > Bindings > Stmt func top > Auto ident new computed simple complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  let b = { $ };

  let a = new b[$("$")](1);
  $(a);
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  let b = { $ };
  let a = new b[$('$')](1);
  $(a);
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  let b = { $: $ };
  const tmpCompObj = b;
  const tmpCompProp = $('$');
  const tmpNewCallee = tmpCompObj[tmpCompProp];
  let a = new tmpNewCallee(1);
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
  const tmpCompProp = $('$');
  const tmpNewCallee = b[tmpCompProp];
  const a = new tmpNewCallee(1);
  $(a);
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '$'
 - 2: 1
 - 3: {}
 - 4: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
