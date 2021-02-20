# Preval test case

# class_extending_string.md

> Normalize > Class > Class extending string
>
> This broke something at some point in time :)

#TODO

## Input

`````js filename=intro
class x extends $(String) {}
`````

## Normalized

`````js filename=intro
const tmpClassSuper = $(String);
let x = class extends tmpClassSuper {};
`````

## Output

`````js filename=intro
$(String);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'function'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
