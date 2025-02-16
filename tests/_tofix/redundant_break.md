# Preval test case

# redundant_break.md

> Tofix > Redundant break
>
> Based on the output it seems we're not (always?) removing redundant breaks
> 
> $(0);
> while (true) {
>   const tmpIfTest = $(true);
>   if (tmpIfTest) {
>     $continue: {
>       break;
>     }
>   } else {
>     break;
>   }
> }
> $(2);

## Input

`````js filename=intro
$(0);
foo: for(;$(true);) {
  if (1) break foo;
  else continue foo;
}
$(2);
`````

## Pre Normal


`````js filename=intro
$(0);
foo: {
  while ($(true)) {
    {
      $continue: {
        {
          if (1) break foo;
          else break $continue;
        }
      }
    }
  }
}
$(2);
`````

## Normalized


`````js filename=intro
$(0);
while (true) {
  const tmpIfTest = $(true);
  if (tmpIfTest) {
    $continue: {
      break;
    }
  } else {
    break;
  }
}
$(2);
`````

## Output


`````js filename=intro
$(0);
$(true);
$(2);
`````

## PST Output

With rename=true

`````js filename=intro
$( 0 );
$( true );
$( 2 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: true
 - 3: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
