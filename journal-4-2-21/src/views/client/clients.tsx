import React, { useState, useContext, Fragment } from 'react';
import styled from 'styled-components'
import { ClientCard } from '../../components/cards/client.card';
import { ProjectCard } from '../../components/cards/project.card';
import { Client, ClientsContext, Project, ProjectsContext } from '../../_models';

import { Panel } from '../../components/panel/panels';
import { ClientForm } from '../../forms/client.forms';