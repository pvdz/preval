# Preval test case

# mutable_param_ident.md

> Function > Mutable param ident
>
> Param names can be written to

#TODO

## Input

`````js filename=intro
function f(a) {
  a = $(10);
  return a;
}
$(f());
`````

## Normalized

`````js filename=intro
let f = function (a) {
  a = $(10);
  return a;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpCalleeParam = $(10);
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 10
 - 2: 10
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
