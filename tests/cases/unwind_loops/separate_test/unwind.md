# Preval test case

# unwind.md

> Unwind loops > Separate test > Unwind
>
> Simple loop that we might want to unwind

Ideally this would be something like

```
$(0);
$(1);
$(2);
$(3);
$(4);
```

Or maybe limit the number of times that we unravel to an arbitrary count. In some cases we may predict the outcome and still exceed it. tbd.

```
$(0);
$(1);
$(2);
let i = 3;
let less = true;
while (less) {
  $(i);
  i = i + 1;
  less = i < 5;
} 
```

## Input

`````js filename=intro
for (let i=0; i<5; ++i) {
  $(i);
}
`````

## Settled


`````js filename=intro
$(0);
$(1);
$(2);
$(3);
$(4);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(0);
$(1);
$(2);
$(3);
$(4);
`````

## Pre Normal


`````js filename=intro
{
  let i = 0;
  while (i < 5) {
    {
      $(i);
    }
    ++i;
  }
}
`````

## Normalized


`````js filename=intro
let i = 0;
while (true) {
  const tmpIfTest = i < 5;
  if (tmpIfTest) {
    $(i);
    const tmpPostUpdArgIdent = $coerce(i, `number`);
    i = tmpPostUpdArgIdent + 1;
  } else {
    break;
  }
}
`````

## PST Settled
With rename=true

`````js filename=intro
$( 0 );
$( 1 );
$( 2 );
$( 3 );
$( 4 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 0
 - 2: 1
 - 3: 2
 - 4: 3
 - 5: 4
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
