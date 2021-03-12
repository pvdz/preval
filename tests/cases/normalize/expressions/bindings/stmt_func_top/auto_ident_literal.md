# Preval test case

# auto_ident_literal.md

> Normalize > Expressions > Bindings > Stmt func top > Auto ident literal
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  let a = "foo";
  $(a);
}
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  let a = 'foo';
  $(a);
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$('foo');
$(undefined);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'foo'
 - 2: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
