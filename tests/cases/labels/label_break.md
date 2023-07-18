# Preval test case

# label_break.md

> Labels > Label break
>
> This is a pseudo-switch

#TODO

## Input

`````js filename=intro
foo: break foo;
`````

## Pre Normal

`````js filename=intro
foo: break foo;
`````

## Normalized

`````js filename=intro
foo: {
  break foo;
}
`````

## Output

`````js filename=intro

`````

## PST Output

With rename=true

`````js filename=intro

`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
