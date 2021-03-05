# Preval test case

# auto_arguments_length.md

> Normalize > Expressions > Assignments > Stmt func top > Auto arguments length
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  let a = { a: 999, b: 1000 };
  a = arguments;
  $(a);
}
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  const tmpPrevalArgumentsAlias = arguments;
  let a = { a: 999, b: 1000 };
  a = tmpPrevalArgumentsAlias;
  $(a);
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function () {
  const tmpPrevalArgumentsAlias = arguments;
  $(tmpPrevalArgumentsAlias);
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: {}
 - 2: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
