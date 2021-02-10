# Preval test case

# complex_sequence.md

> return > complex_sequence
>
> Returning a sequence that ends in a simple node

#TODO

## Input

`````js filename=intro
function f(){ 
  throw 'x';
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  throw 'x';
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - eval returned: ('<crash[ x ]>')

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
