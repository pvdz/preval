# Preval test case

# negative_number.md

> Primitive arg inlining > Negative number
>
> Negative number should be inlinable

#TODO

## Input

`````js filename=intro
function f(a) {
  return a;
}
$(f(-1));
`````

## Normalized

`````js filename=intro
let f = function (a) {
  return a;
};
const tmpCallCallee = $;
const tmpCalleeParam = f(-1);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$(-1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: -1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same