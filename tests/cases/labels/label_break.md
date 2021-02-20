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

## Normalized

`````js filename=intro
foo: {
  break foo;
}
`````

## Output

`````js filename=intro
foo: {
  break foo;
}
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
