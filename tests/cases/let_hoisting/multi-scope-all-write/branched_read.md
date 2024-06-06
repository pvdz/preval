# Preval test case

# branched_read.md

> Let hoisting > Multi-scope-all-write > Branched read
>
> All reads are preceded by a write but one of them is in a branch after the write.

#TODO

## Input

`````js filename=intro
const f = function (s) {
  let promoMe = s === '';
  const g = function () {
    const r = $('.');
    promoMe = r === '.';
    if (promoMe) {
      const t = $('');
      promoMe = t !== '.';
      return promoMe;
    } else {
      return promoMe;
    }
  };
  if (promoMe) {
    return promoMe;
  } else {
    const v = g();
    return v;
  }
};
if ($) $(f);
`````

## Pre Normal


`````js filename=intro
const f = function ($$0) {
  let s = $$0;
  debugger;
  let promoMe = s === ``;
  const g = function () {
    debugger;
    const r = $(`.`);
    promoMe = r === `.`;
    if (promoMe) {
      const t = $(``);
      promoMe = t !== `.`;
      return promoMe;
    } else {
      return promoMe;
    }
  };
  if (promoMe) {
    return promoMe;
  } else {
    const v = g();
    return v;
  }
};
if ($) $(f);
`````

## Normalized


`````js filename=intro
const f = function ($$0) {
  let s = $$0;
  debugger;
  let promoMe = s === ``;
  const g = function () {
    debugger;
    const r = $(`.`);
    promoMe = r === `.`;
    if (promoMe) {
      const t = $(``);
      promoMe = t !== `.`;
      return promoMe;
    } else {
      return promoMe;
    }
  };
  if (promoMe) {
    return promoMe;
  } else {
    const v = g();
    return v;
  }
};
if ($) {
  $(f);
} else {
}
`````

## Output


`````js filename=intro
const f = function ($$0) {
  const s = $$0;
  debugger;
  const promoMe = s === ``;
  if (promoMe) {
    return true;
  } else {
    const r = $(`.`);
    const tmpssa2_promoMe = r === `.`;
    if (tmpssa2_promoMe) {
      const t = $(``);
      const tmpClusterSSA_tmpssa2_promoMe = t !== `.`;
      return tmpClusterSSA_tmpssa2_promoMe;
    } else {
      return false;
    }
  }
};
if ($) {
  $(f);
} else {
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = function($$0 ) {
  const b = c;
  debugger;
  const d = b === "";
  if (d) {
    return true;
  }
  else {
    const e = $( "." );
    const f = e === ".";
    if (f) {
      const g = $( "" );
      const h = g !== ".";
      return h;
    }
    else {
      return false;
    }
  }
};
if ($) {
  $( a );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
