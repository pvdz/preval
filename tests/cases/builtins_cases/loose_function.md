# Preval test case

# loose_function.md

> Builtins cases > Loose function
>
> This is from a jsfk case

## Input

`````js filename=intro
// Note: this is an octal escape, illegal in strict mode, but Function does not inherit that
const ok = Function('return "\\44"'); // 0o44 = $
$(ok());
`````

## Pre Normal


`````js filename=intro
const ok = Function(`return "\\44"`);
$(ok());
`````

## Normalized


`````js filename=intro
const ok = function () {
  debugger;
  return `\$`;
};
const tmpCalleeParam = ok();
$(tmpCalleeParam);
`````

## Output


`````js filename=intro
$(`\$`);
`````

## PST Output

With rename=true

`````js filename=intro
$( "$" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '$'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
