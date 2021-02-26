# Preval test case

# auto_ident_delete_computed_simple_complex.md

> Normalize > Expressions > Bindings > Stmt func top > Auto ident delete computed simple complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  let arg = { y: 1 };

  let a = delete arg[$("y")];
  $(a, arg);
}
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  let arg = { y: 1 };
  const tmpDeleteCompObj = arg;
  const tmpDeleteCompProp = $('y');
  let a = delete tmpDeleteCompObj[tmpDeleteCompProp];
  $(a, arg);
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function () {
  const arg = { y: 1 };
  const tmpDeleteCompProp = $('y');
  const a = delete arg[tmpDeleteCompProp];
  $(a, arg);
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'y'
 - 2: true, {}
 - 3: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
