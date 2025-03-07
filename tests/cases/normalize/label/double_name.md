# Preval test case

# double_name.md

> Normalize > Label > Double name
>
> Check the label renaming algo. The label names ought to be unique just like binding idents.

## Input

`````js filename=intro
foo: {
  break foo;
}
foo: {
  break foo;
}
foo: {
  break foo;
}
`````

## Settled


`````js filename=intro

`````

## Denormalized
(This ought to be the final result)

`````js filename=intro

`````

## Pre Normal


`````js filename=intro
foo: {
  break foo;
}
foo$1: {
  break foo$1;
}
foo$3: {
  break foo$3;
}
`````

## Normalized


`````js filename=intro

`````

## PST Settled
With rename=true

`````js filename=intro

`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
