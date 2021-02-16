# Preval test case

# var_decl_is_const_nested.md

> binding > var_decl_is_const_nested
>
> This is a var decl that is actually a constant but the only write is nested in something else. After our normalization steps it has to be a statement.

The x should be made a constant.

#TODO

## Input

`````js filename=intro
var x;
{
  $(x = $(10));
  $(x);
}
`````

## Normalized

`````js filename=intro
var x;
const tmpCallCallee = $;
x = $(10);
let tmpCalleeParam = x;
tmpCallCallee(tmpCalleeParam);
$(x);
`````

## Output

`````js filename=intro
const x = $(10);
let tmpCalleeParam = x;
$(tmpCalleeParam);
$(x);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 10
 - 2: 10
 - 3: 10
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
