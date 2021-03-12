# Preval test case

# unused_only_return.md

> Normalize > Return > Unused only return
>
> Unused return statements should be eliminated

#TODO

## Input

`````js filename=intro
function f() {
  return;
}

$(f());
`````

## Normalized

`````js filename=intro
let f = function () {};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$(undefined);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
